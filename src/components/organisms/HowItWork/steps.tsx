import React, { Fragment } from 'react';
import { shape, string } from 'prop-types';
import { useTranslation } from 'next-i18next';
import classes from './steps.module.css';

const Steps = () => {
  const t = useTranslation('common');
  return (
    <Fragment>
      <section className={classes.section}>
        <div className="container mx-auto">
          <div className={classes.heading}>
            <h2>How it works?</h2>
            <div className={classes.heading_desc}>
              Anyone can create a contest and anyone can join as an artist. We
              escrow the fund in exchange between the parties until both are
              satisfied.
            </div>
          </div>
          <div className={classes.steps}>
            <div className={classes.step1}>
              <span className="badge-number">1</span>
              <h3>Create your NFT design contest</h3>
              <div>
                Visualize a design that fits. Explain your expectations and
                let’s explore design inspirations.
              </div>
            </div>
            <div className={classes.step2}>
              <span className="badge-number">2</span>
              <h3>Your contest has been listed.</h3>
              <div>
                Stay tuned and see the magic happens by the professional NFT
                designers.
              </div>
            </div>
            <div className={classes.step3}>
              <span className="badge-number">3</span>
              <h3>Evaluate and refine</h3>
              <div>
                Unlimited designs and revisions. Review and select the design
                you love. Let the community vote on the best designs.
              </div>
            </div>
            <div className={classes.step4}>
              <span className="badge-number">4</span>
              <h3>Hura!!! Get it done.</h3>
              <div>
                Release award and get design with full intellectual property.
                Choose whatever format you prefer.
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default Steps;
