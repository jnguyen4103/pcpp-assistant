import React from 'react';
import ResultPageView from './ResultPageView';
import PropTypes from 'prop-types';

const ResultPage = (props) => {
    return <ResultPageView parts={props.location.pc} />;
};

ResultPage.propTypes = {
    location: PropTypes.object,
    pc: PropTypes.object,
};

export default ResultPage;
