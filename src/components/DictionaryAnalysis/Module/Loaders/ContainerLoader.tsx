import {CircularLoader} from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

export default function ContainerLoader({height}:any) {

    return (
        <div style={{height: height ?? '100%', minHeight: height ?? '100%'}}
             className='column center align-items-center'>
            <CircularLoader small/>
        </div>
    )
}

ContainerLoader.propTypes = {
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
