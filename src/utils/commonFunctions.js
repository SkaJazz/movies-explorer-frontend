const sendRequestWithErrorHandler = (request) =>
  request.catch((e) => {
    console.log(e);
  });

  export { sendRequestWithErrorHandler };
