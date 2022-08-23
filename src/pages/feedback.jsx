import PropTypes from 'prop-types';
import FeedbackMessage from 'components/atoms/FeedbackMessage';

export default function FeedbackPage({ type }) {
  return <FeedbackMessage type={type} />;
}

FeedbackPage.getInitialProps = async ({ query }) => {
  const { type } = query;
  console.log({ type });
  return { type };
};

FeedbackPage.propTypes = {
  type: PropTypes.oneOf([
    'StatusReport',
    'CreateFridge',
    'EmailSuccess',
    'EmailError',
  ]),
};
