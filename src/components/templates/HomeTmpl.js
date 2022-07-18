/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment } from 'react';
import Header from '../organisms/Header';
import Hero from '../organisms/Hero';
import JobListing from '../organisms/JobListing';
import Footer from '../organisms/Footer';
import css from 'styled-jsx/css';

const styles = css`
	/* stylelint-disable */
`;

const HomeTmpl = (props) => {
	return (
		<Fragment>
			<Header />
			<Hero type="type-1" />
			<JobListing />
			<Hero type="type-2" />
			<Hero type="type-3" />
			<Footer />
			<style jsx>{styles}</style>
		</Fragment>
	);
};

HomeTmpl.propTypes = {};

export default HomeTmpl;
