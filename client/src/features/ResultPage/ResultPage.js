import React from 'react';
import ResultPageView from './ResultPageView';
import PropTypes from 'prop-types';

const ResultPage = (props) => {
    console.log(props.location.pc);
    return <ResultPageView parts={props.location.pc} />;
};

ResultPage.propTypes = {
    location: PropTypes.object,
    pc: PropTypes.object,
};

export default ResultPage;
