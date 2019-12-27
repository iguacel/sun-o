import React from "react";

function Footer(props) {
  return (
    <div
      className="max center"
      style={{ padding: "5em 1em 5em 1em", fontSize: "60%" }}
    >
      {/* <p>
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
        <p>
          <a
            href="https://twitter.com/infoiguacel"
            target="_blank"
            rel="noopener noreferrer"
            title="iguacel twitter"
          >
            <strong> @infoiguacel</strong> 2019
          </a>
        </p>
      </p> */}
      <p>
        <a
          href="https://momentjs.com/docs/#/displaying/unix-offset/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Moment Docs
        </a>
      </p>
      <p>
        <a
          href="https://www.suncalc.org/#/40.1789,-3.5156,3/2019.12.08/21:34/1/3"
          target="_blank"
          rel="noopener noreferrer"
        >
          SunCalc.org
        </a>
      </p>
      <p>
        <a
          href="https://github.com/mourner/suncalc"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github Suncalc
        </a>
      </p>
      <p>
        <a
          href="https://www.timeanddate.com/astronomy/different-types-twilight.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Date and time
        </a>
      </p>
      <p>
        <a
          href="https://www.timeanddate.com/astronomy/spain/pamplona"
          target="_blank"
          rel="noopener noreferrer"
        >
          Date and time Pamplona
        </a>
      </p>
      <p>
        <a
          href="https://www.timeanddate.com/worldclock/"
          target="_blank"
          rel="noopener noreferrer"
        >
          World clock
        </a>
      </p>
      <p>
        <a
          href="http://spacetime.how/"
          rel="noopener noreferrer"
          target="_blank"
        >
          World clock
        </a>
      </p>
    </div>
  );
}

export default Footer;
