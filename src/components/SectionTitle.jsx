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

      <h2 className="section-title mt-3">
        {title}
      </h2>

      {description && (
        <p className="section-description mt-3">
          {description}
        </p>
      )}

    </div>
  );
};

export default SectionTitle;