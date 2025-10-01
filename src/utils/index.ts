import { Types } from 'mongoose';

export const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const convertTextToRegex = (text: string | undefined) => {
  if (typeof text === 'string' && text.trim().length > 0) {
    return {
      $regex: escapeRegExp(text.trim()),
      $options: 'i',
    };
  } else return undefined;
};

export const getQueryOptions = (obj: any) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined),
  );
};

export const toObjectIdArray = (ids: string | string[]) => {
  if (!ids) return [];

  // accept comma-separated string or array
  let arr: string[] = [];
  if (Array.isArray(ids)) arr = ids;
  else if (typeof ids === 'string')
    arr = ids
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  else return [];

  // filter invalid ids and convert
  return arr
    .filter((id) => Types.ObjectId.isValid(id))
    .map((id) => new Types.ObjectId(id));
};

export const groupAnswersBySurvey = (answers: any[]) => {
  const map = new Map<string, any[]>();
  for (const a of answers) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const sid = String(a.surveyId);
    if (!map.has(sid)) map.set(sid, []);
    map.get(sid)!.push(a);
  }
  return Array.from(map.entries()).map(([surveyId, answers]) => ({
    surveyId,
    answers,
  }));
};
