export function checkRatingSubmit(rating, position) {
  if (rating?.main?.submit && rating?.left?.submit && rating?.right?.submit)
    return false;
  return rating?.[position]?.submit;
}

export function showRating(rating, position) {
  if (
    rating?.main?.submit &&
    rating?.left?.submit &&
    rating?.right?.submit &&
    rating?.[position]?.valid
  ) {
    return 'white';
  } else if (
    rating?.main?.submit &&
    rating?.left?.submit &&
    rating?.right?.submit &&
    !rating?.[position]?.valid
  ) {
    return 'red';
  } else {
    return false;
  }
}

export function handelSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const body = {};
  for (let [key, value] of formData.entries()) {
    body[key] = value;
  }
  return body;
}
