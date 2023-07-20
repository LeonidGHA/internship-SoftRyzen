const defineCastingCardState = (
  isActive: boolean,
  isSuccessed: boolean,
  isFailed: boolean
): string => {
  if (isActive && !isFailed && !isSuccessed) {
    return 'active';
  } else if (!isActive && !isFailed && !isSuccessed) {
    return 'idle';
  } else if (isActive && isSuccessed) {
    return 'success';
  } else if (isSuccessed) {
    return 'success';
  } else if (isActive && isFailed) {
    return 'failed';
  } else if (isFailed) {
    return 'failed';
  } else {
    return 'idle';
  }
};

export default defineCastingCardState;
