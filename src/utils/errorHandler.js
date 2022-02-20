const sendRequestWithErrorHandler = (request, errorHandler) =>
  request.catch(error => {
    console.log(error);
    errorHandler(error);
  });

export default sendRequestWithErrorHandler;
