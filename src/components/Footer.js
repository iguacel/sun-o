import React from "react";

function Footer(props) {
  return (
    <div
      className="max center"
      style={{ padding: "5em 1em 5em 1em", fontSize: "60%" }}
    >
      <p>
        Sun calculations:
        <a
          href="https://github.com/janrg/MeeusSunMoon"
          target="_blank"
          rel="noopener noreferrer"
          title="MeeusSunMoon Github"
        >
          <strong> MeeusSunMoon</strong> (Gina Häußge),{" "}
        </a>
        <a
          href="https://github.com/mbostock/solar-calculator"
          target="_blank"
          rel="noopener noreferrer"
          title="Solar Calculator Github"
        >
          <strong> solar-calculator</strong> (Mike Bostock)
        </a>
      </p>

      <p>
        <a
          href="https://twitter.com/infoiguacel"
          target="_blank"
          rel="noopener noreferrer"
          title="iguacel twitter"
        >
          <strong> @infoiguacel</strong> {new Date().getFullYear()}
        </a>
      </p>
    </div>
  );
}

export default Footer;
