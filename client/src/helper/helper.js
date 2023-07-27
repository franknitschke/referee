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
    return '';
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

export async function getData(url, method, accessToken) {
  try {
    const req = await fetch(url, {
      method: method,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (req.ok) {
      return await req.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
