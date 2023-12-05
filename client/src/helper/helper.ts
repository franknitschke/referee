export function checkRatingSubmit(
  rating: RatingObject,
  position: RatingKeys
): boolean | null | undefined {
  if (rating?.main?.submit && rating?.left?.submit && rating?.right?.submit)
    return false;
  return rating?.[position]?.submit;
}

export function showRating(rating: RatingObject, position: RatingKeys) {
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

export function handelSubmit(e: any): object {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  console.log(formData);
  const body: Record<string, any> = {};
  for (let [key, value] of formData.entries()) {
    body[key] = value;
  }
  return body;
}

export async function getData(
  url: string,
  method: Method,
  accessToken: string | null
): Promise<Record<string, string> | null> {
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

export function translateDiscipline(discipline: string):string {
  switch (discipline) {
    case 'squat':
      return 'KB'
    case 'benchPress':
      return 'BP'
    case 'deadlift':
      return 'KH'
    default:
      return ''

}
}
