import {CenteredContent, CircularLoader, colors} from "@dhis2/ui";
import PropTypes from "prop-types";
import React from "react";

export default function FullPageLoader({text, small}) {
    return (
        <div className="column center" style={{height: "100%", width: '100%'}}>
            <CenteredContent>
                <div>
                    <CircularLoader small={small}/>
                    <p style={{color: colors.default}}>{text}</p>
                </div>
            </CenteredContent>
        </div>
    );
}

FullPageLoader.propTypes = {
    small: PropTypes.bool,
    text: PropTypes.string,
};
