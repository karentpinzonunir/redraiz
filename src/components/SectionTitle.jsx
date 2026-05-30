import React from "react";

const SectionTitle = ({
  tag,
  title,
  description,
  center = false,
}) => {
  return (
    <div className={center ? "text-center" : ""}>

      <span className="section-tag">
        {tag}
      </span>

      <h2 className="mt-3">
        {title}
      </h2>

      {description && (
        <p className="mt-3 fs-5">
          {description}
        </p>
      )}

    </div>
  );
};

export default SectionTitle;