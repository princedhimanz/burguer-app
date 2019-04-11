import React, { useEffect, useState } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);

    useEffect(() => {
      axios.interceptors.request.use(req => {
        setError(null);
        return req;
      });
      axios.interceptors.response.use(
        res => res,
        error => {
          setError(error);
        }
      );
      return () => {
        setError(null);
      };
    }, []);

    return (
      <React.Fragment>
        <Modal show={error} modalClosed={() => setError(null)}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withErrorHandler;
