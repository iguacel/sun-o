import React from "react";

function Moon({
  fraction = 0.2,
  colorOfTheUniverse = "transparent",
  colorOfTheSun = "white",
  colorOfTheDarkness = "black",
  r = 20
}) {
  const moonPhase = Math.trunc(fraction * 4) % 4; // %4 so fraction == 1 results in phase == 0
  const backgroundColor = moonPhase < 2 ? colorOfTheDarkness : colorOfTheSun;
  const coverColor =
    moonPhase === 0 || moonPhase === 3 ? colorOfTheDarkness : colorOfTheSun;
  const revealColor = moonPhase < 2 ? colorOfTheSun : colorOfTheDarkness;
  const quarterFraction = +parseFloat(fraction % 0.25).toFixed(2);
  const snakeEyeClosing =
    r * 4 * (moonPhase % 2 === 1 ? 0 : 1 / 4 - quarterFraction);
  const snakeEyeOpening = r * 4 * (moonPhase % 2 === 0 ? 0 : quarterFraction);
  const d = 2 * r;

  return (
    <svg
      viewBox={`-${r} -${r} ${d} ${d}`}
      style={{ maxWidth: `${d}px`, backgroundColor: colorOfTheUniverse }}
    >
      <defs>
        <clipPath id="showRightHalf">
          <rect y={`-${r}`} width="50%" height="100%" />
        </clipPath>
      </defs>
      <circle fill={backgroundColor} r={r} />
      <g clipPath="showRightHalf">
        <circle fill={revealColor} r={r} />
        <ellipse fill={coverColor} ry={r} rx={snakeEyeClosing} />
      </g>
      <ellipse fill={revealColor} ry={r} rx={snakeEyeOpening} />
    </svg>
  );
}

export default Moon;
