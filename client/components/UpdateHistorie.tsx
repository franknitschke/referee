import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type Github = {
  tag_name: string;
  body: string;
  name: string;
  published_at: string;
  id: number;
};

function UpdateHistorie() {
  const [updates, setUpdates] = useState<Github[]>([]);
  async function getUpdates() {
    try {
      const req = await fetch(
        "https://api.github.com/repos/franknitschke/referee/releases",
        {
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
      if (req.ok) {
        const res = (await req.json()) as Github[];
        setUpdates(res);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getUpdates();
  }, []);

  if (updates?.length === 0) return null;

  return (
    <div className="relative w-2/3 h-1/3 m-auto overflow-y-scroll card bg-base-100 shadow-xl gap-y-2 p-2 mt-10">
      <div>Versionen:</div>
      {updates?.map((el) => (
        <div
          className="collapse collapse-arrow bg-base-200 relative min-h-fit"
          key={el.id}
        >
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium ">
            {`${el.name} - Veröffentlicht: ${el.published_at?.split("T")[0]}`}
          </div>
          <div className="collapse-content text-base text-left">
            <ReactMarkdown className={"reactMarkdown"}>
              {el?.body}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UpdateHistorie;
