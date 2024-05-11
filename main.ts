import { PullRequestClient, ProjectClient } from "https://deno.land/x/kd_clients@v1.0.0-preview.9/GitHubClients/mod.ts";
import { IssuePayload } from "./data/issue-payload.ts";
import { Validator } from "./services/validator.ts";

const prMetaDataRegex = /<!--\s*closed-by-pr:\s*[1-9][0-9]*\s*-->/gm;

Deno.serve({ port: 3000 }, async (req) => {
    const url = new URL(req.url);

    console.log("Received request");

    if (url.pathname !== "/webhook") {
        return new Response("Not Found", { status: 404 });
    }

    const jsonData = await req.text();

    const validationResult = await Validator.validateRequest(req.headers, jsonData);

    if (!validationResult.isValid) {
        return new Response(validationResult.message, { status: 403 });
    }

    const data = JSON.parse(jsonData);// as IssuePayload;

    Deno.writeTextFileSync("current-payload.json", jsonData);

    return new Response("asdf", { status: 200 });

    const repoOwner = data.repository.owner.login;
    const repoName = data.repository.name;
    const token = Deno.env.get("GITHUB_TOKEN") ?? "";

    const prClient = new PullRequestClient(repoOwner, repoName, token);

    await prClient.addLabel(2, data.label.name);

    // TODO: NEed to get the pull request number based on the issue body that contains the special syntax
    const pr = await prClient.getPullRequest(2);
    // const projClient = new ProjectClient(repoOwner, repoName, token);

    const prUrl = `https://github.com/${repoOwner}/${repoName}/pull/${2}`;
    const msg = `The label '${data.label.name}' has been added to pull request '${2} - (${prUrl})'`;
    console.log(msg);

    return new Response(msg, { status: 200 });
});
