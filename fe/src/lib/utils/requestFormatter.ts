const BASE_URL = "http://localhost:3000";

type TMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface IRequestFormatter {
  method: TMethod;
  path: string;
  body?: unknown;
}

export default function requestFormatter({
  method,
  path,
  body,
}: IRequestFormatter): [url: RequestInfo, options: RequestInit] {
  const url = BASE_URL + path;

  let options: { [k: string]: any } = {
    headers: {
      ["Content-Type"]: "application/json",
    },
  };

  if (method === "GET") {
    options["method"] = method;
  }

  if (method === "POST" || method === "PATCH" || method === "DELETE") {
    options["method"] = method;
    options["body"] = JSON.stringify(body);
  }

  return [url, options];
}
