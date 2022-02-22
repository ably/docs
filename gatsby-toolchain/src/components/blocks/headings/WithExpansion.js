import React from 'react';

const withExpansion = (Heading, anchor, expandTitle, expandID, title, content) => {
  return (
    <>
      <Heading id={anchor} expandTitle={expandTitle}>
        {title}
      </Heading>
      <div className={'collapsible-wrapper'}>
        <input id={`collapsible-heading${expandID}`} className="minimize-checkbox toggle" type="checkbox" />
        <label htmlFor={`collapsible-heading${expandID}`} className="label-collapsible">
          {expandTitle}
        </label>
        <div className="collapsible-content">
          <div className="collapsible-inner">
            <br />
            {content}
            <br />
          </div>
          <label htmlFor={`collapsible-heading${expandID}`} className="label-collapsible-close">
            - View Less
          </label>
        </div>
      </div>
    </>
  );
};

export default withExpansion;
