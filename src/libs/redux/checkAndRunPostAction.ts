import type { AsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const checkAndRunPostAction = <
  Returned,
  ThunkArg,
  ThunkApiConfig extends { rejectValue?: unknown },
>(
  thunk: AsyncThunk<Returned, ThunkArg, ThunkApiConfig>,
  action: PayloadAction<unknown>,
  callback: (payload: Returned) => void
): void => {
  if (thunk.fulfilled.match(action)) {
    callback(action.payload as Returned);
  }
};

export { checkAndRunPostAction };
