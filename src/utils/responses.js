export const success = (data) => {
   return { isSuccess: true, data };
}

export const messageError = (message) => {
   return { isSuccess: false, message };
}

export const notFound = (entity = undefined) => {
   return { isSuccess: false, message: `${entity ?? 'Item'} was not found` };
}

export const internalError = () => {
   return { isSuccess: false, message: 'Internal error' };
}