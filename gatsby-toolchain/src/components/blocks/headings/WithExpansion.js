import React from 'react';

const withExpansion = (Heading, anchor, expandTitle, expandID, title, content) => {
    return <>
        <Heading id={anchor} expandTitle={ expandTitle }>{ title }</Heading>
        <div className={'collapsible-wrapper'}>
            <input id={`collapsible-heading${expandID}`} class='minimize-checkbox toggle' type='checkbox' />
            <label for={`collapsible-heading${expandID}`} class='label-collapsible'>{expandTitle}</label>
            <div class='collapsible-content'>
            <div class='collapsible-inner'>
                <br/>
                {content}
                <br/>
            </div>
            <label for={`collapsible-heading${expandID}`} class='label-collapsible-close'>- View Less</label>
            </div>
        </div>
    </>;
}

export default withExpansion;