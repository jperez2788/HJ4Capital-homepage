// Animated line background behind sections marked data-shader="light" or "dark".
// One full-screen WebGL canvas sits behind the page; each pixel uses the light
// (cream) or dark (ink) palette depending on which kind of section is over it.
// Colors are RGB values from 0 to 1. Tweak the PALETTE block to restyle.
(function () {
  var PALETTE = {
    // Light sections: cream background, soft warm-gray lines
    lightBgLeft: [0.953, 0.941, 0.910], // --color-paper  #f3f0e8
    lightBgRight: [0.906, 0.886, 0.839], // --color-paper-2 #e7e2d6
    lightLine: [0.62, 0.58, 0.50],
    lightStrength: 0.4,
    // Dark sections: near-black background, muted gold lines
    darkBgLeft: [0.047, 0.047, 0.043], // --color-ink      #0c0c0b
    darkBgRight: [0.086, 0.086, 0.078], // --color-ink-soft #161614
    darkGlow: [0.13, 0.12, 0.10], // warm lift in the middle of the screen
    darkLine: [0.78, 0.66, 0.45],
    darkStrength: 0.5,
  };
  var SPEED = 0.2; // overall animation speed
  var MAX_DARK_AREAS = 8;

  var sections = document.querySelectorAll("[data-shader]");
  if (!sections.length) return;

  var canvas = document.createElement("canvas");
  canvas.className = "shader-background";
  canvas.setAttribute("aria-hidden", "true");
  var gl = canvas.getContext("webgl", { antialias: false, alpha: false });
  if (!gl) return; // no WebGL: sections keep their solid colors

  var vsSource = "attribute vec4 aVertexPosition; void main() { gl_Position = aVertexPosition; }";

  var fsSource = [
    "precision highp float;",
    "uniform vec2 iResolution;",
    "uniform float iTime;",
    "uniform vec4 uDark[" + MAX_DARK_AREAS + "];",
    "uniform int uDarkCount;",
    "uniform vec3 uLightBgL; uniform vec3 uLightBgR; uniform vec3 uLightLine; uniform float uLightStrength;",
    "uniform vec3 uDarkBgL; uniform vec3 uDarkBgR; uniform vec3 uDarkGlow; uniform vec3 uDarkLine; uniform float uDarkStrength;",
    "",
    "const float overallSpeed = " + SPEED.toFixed(3) + ";",
    "const float gridSmoothWidth = 0.015;",
    "const float scale = 5.0;",
    "const float minLineWidth = 0.01;",
    "const float maxLineWidth = 0.2;",
    "const float lineSpeed = 1.0 * overallSpeed;",
    "const float lineAmplitude = 1.0;",
    "const float lineFrequency = 0.2;",
    "const float warpSpeed = 0.2 * overallSpeed;",
    "const float warpFrequency = 0.5;",
    "const float warpAmplitude = 1.0;",
    "const float offsetFrequency = 0.5;",
    "const float offsetSpeed = 1.33 * overallSpeed;",
    "const float minOffsetSpread = 0.6;",
    "const float maxOffsetSpread = 2.0;",
    "const int linesPerGroup = 16;",
    "",
    "#define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))",
    "#define drawSmoothLine(pos, halfWidth, t) smoothstep(halfWidth, 0.0, abs(pos - (t)))",
    "#define drawCrispLine(pos, halfWidth, t) smoothstep(halfWidth + gridSmoothWidth, halfWidth, abs(pos - (t)))",
    "",
    "float random(float t) { return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0; }",
    "float getPlasmaY(float x, float horizontalFade, float offset) {",
    "  return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;",
    "}",
    "",
    "bool inDarkArea(vec2 p) {",
    "  for (int i = 0; i < " + MAX_DARK_AREAS + "; i++) {",
    "    if (i >= uDarkCount) break;",
    "    vec4 r = uDark[i];",
    "    if (p.x >= r.x && p.x <= r.z && p.y >= r.y && p.y <= r.w) return true;",
    "  }",
    "  return false;",
    "}",
    "",
    "void main() {",
    "  vec2 fragCoord = gl_FragCoord.xy;",
    "  vec2 uv = fragCoord / iResolution;",
    "  vec2 space = (fragCoord - iResolution / 2.0) / iResolution.x * 2.0 * scale;",
    "  float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);",
    "  float verticalFade = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);",
    "  space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);",
    "  space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;",
    "",
    "  float lines = 0.0;",
    "  for (int l = 0; l < linesPerGroup; l++) {",
    "    float normalizedLineIndex = float(l) / float(linesPerGroup);",
    "    float offsetTime = iTime * offsetSpeed;",
    "    float offsetPosition = float(l) + space.x * offsetFrequency;",
    "    float rand = random(offsetPosition + offsetTime) * 0.5 + 0.5;",
    "    float halfWidth = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;",
    "    float offset = random(offsetPosition + offsetTime * (1.0 + normalizedLineIndex)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);",
    "    float linePosition = getPlasmaY(space.x, horizontalFade, offset);",
    "    float line = drawSmoothLine(linePosition, halfWidth, space.y) / 2.0 + drawCrispLine(linePosition, halfWidth * 0.15, space.y);",
    "    float circleX = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;",
    "    vec2 circlePosition = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));",
    "    line += drawCircle(circlePosition, 0.01, space) * 4.0;",
    "    lines += line * rand;",
    "  }",
    "",
    "  vec3 color;",
    "  if (inDarkArea(fragCoord)) {",
    "    vec3 bg = mix(uDarkBgL, uDarkBgR, uv.x);",
    "    bg = mix(bg, uDarkGlow, verticalFade * horizontalFade * 0.6);",
    "    color = mix(bg, uDarkLine, clamp(lines * uDarkStrength, 0.0, 1.0));",
    "  } else {",
    "    vec3 bg = mix(uLightBgL, uLightBgR, uv.x);",
    "    color = mix(bg, uLightLine, clamp(lines * uLightStrength, 0.0, 1.0));",
    "  }",
    "  gl_FragColor = vec4(color, 1.0);",
    "}",
  ].join("\n");

  function loadShader(type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  var vs = loadShader(gl.VERTEX_SHADER, vsSource);
  var fs = loadShader(gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return;
  var program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Shader link error:", gl.getProgramInfoLog(program));
    return;
  }
  gl.useProgram(program);

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  var aPos = gl.getAttribLocation(program, "aVertexPosition");
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPos);

  function u(name) { return gl.getUniformLocation(program, name); }
  var uRes = u("iResolution");
  var uTime = u("iTime");
  var uDark = u("uDark");
  var uDarkCount = u("uDarkCount");
  gl.uniform3fv(u("uLightBgL"), PALETTE.lightBgLeft);
  gl.uniform3fv(u("uLightBgR"), PALETTE.lightBgRight);
  gl.uniform3fv(u("uLightLine"), PALETTE.lightLine);
  gl.uniform1f(u("uLightStrength"), PALETTE.lightStrength);
  gl.uniform3fv(u("uDarkBgL"), PALETTE.darkBgLeft);
  gl.uniform3fv(u("uDarkBgR"), PALETTE.darkBgRight);
  gl.uniform3fv(u("uDarkGlow"), PALETTE.darkGlow);
  gl.uniform3fv(u("uDarkLine"), PALETTE.darkLine);
  gl.uniform1f(u("uDarkStrength"), PALETTE.darkStrength);

  document.body.insertBefore(canvas, document.body.firstChild);
  document.documentElement.classList.add("has-shader");

  var dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  }
  window.addEventListener("resize", resize);
  resize();

  // Pass on-screen dark sections to the shader (in canvas pixels, origin bottom-left).
  var darkSections = document.querySelectorAll('[data-shader="dark"]');
  var rects = new Float32Array(MAX_DARK_AREAS * 4);
  function anyShaderSectionVisible() {
    var h = window.innerHeight;
    for (var i = 0; i < sections.length; i++) {
      var r = sections[i].getBoundingClientRect();
      if (r.bottom > 0 && r.top < h) return true;
    }
    return false;
  }
  function updateDarkAreas() {
    var count = 0;
    var vh = window.innerHeight;
    for (var i = 0; i < darkSections.length && count < MAX_DARK_AREAS; i++) {
      var r = darkSections[i].getBoundingClientRect();
      if (r.bottom <= 0 || r.top >= vh) continue;
      rects[count * 4] = r.left * dpr;
      rects[count * 4 + 1] = (vh - r.bottom) * dpr;
      rects[count * 4 + 2] = r.right * dpr;
      rects[count * 4 + 3] = (vh - r.top) * dpr;
      count++;
    }
    gl.uniform4fv(uDark, rects);
    gl.uniform1i(uDarkCount, count);
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var start = performance.now();
  function frame(now) {
    // Skip work while only the hero/footer is on screen.
    if (anyShaderSectionVisible()) {
      updateDarkAreas();
      gl.uniform1f(uTime, reduceMotion ? 8.0 : (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    if (!reduceMotion) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  if (reduceMotion) {
    // Still frame: redraw when scrolling so light/dark areas line up.
    window.addEventListener("scroll", function () { requestAnimationFrame(frame); }, { passive: true });
    window.addEventListener("resize", function () { requestAnimationFrame(frame); });
  }
})();
