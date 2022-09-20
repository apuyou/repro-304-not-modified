import fetch from "node-fetch";

const request = async (currentEtag) => {
  const response = await fetch(
    "https://repro-304-not-modified.vercel.app/api/hello-10s-silent",
    {
      headers: currentEtag
        ? {
            "if-none-match": currentEtag,
          }
        : undefined,
    }
  );
  let time;
  try {
    console.log(await response.text());
    const result = await response.json();
    console.log(result);
    time = result.time;
  } catch {}
  const etag = response.headers.get("etag");
  console.log(
    `Result status=${
      response.status
    } if-none-match=${currentEtag} etag=${etag} x-vercel-cache=${response.headers.get(
      "x-vercel-cache"
    )} x-cache=${response.headers.get("x-cache")} time=${time}`
  );
  console.log(response.headers.get("cache-control"))

  setTimeout(() => {
    request(etag || currentEtag);
  }, 500);
};

const main = async () => {
  request();
};

main();
