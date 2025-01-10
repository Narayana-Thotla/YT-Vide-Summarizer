import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";


const HASURA_ENDPOINT = process.env.HASURA_ENDPOINT;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET;


export async function POST(req: NextRequest, params: any) {
  // const body = await req.text();
  const body = await req.json();

  console.log("body in save-user:", body);

  try {
    const { email, url, title, response } = body;
    console.log(email, url, title, response, process.env.HASURA_ADMIN_SECRET);

    // const mutation = `
    //   mutation InsertVideoData($email: String!, $url: String!, $title: String!, $response: String!) {
    //     insert_yt_video_data_one(object: {
    //       email: $email,
    //       url: $url,
    //       title: $title,
    //       response: $response
    //     }) {
    //       id
    //       url
    //       title
    //     }
    //   }
    // `;

    // const mutation = `
    //   mutation insert_yt_video_data_one($object: yt_video_data_insert_input!) {
    //     insert_yt_video_data_one(object: $object) {
    //       email
    //       id
    //       response
    //       title
    //       url
    //     }
    //   }
    // `;

    const mutation = `mutation InsertYTVideoData($title: String, $url: String, $email: citext = "$email", $response: String = "$response") {
  insert_YT_Video_Data(objects: {title: $title, url: $url, response: $response, email: $email}) {
    affected_rows
    returning {
      response
      title
      url
      email
      id
    }
  }
}

`;

    // console.log("secret hasura rest api:", `"${process.env.HASURA_ADMIN_SECRET}"`);

    //original
    // const result = await fetch(
    //   "https://lesfhoucwjhkulqdwned.hasura.ap-south-1.nhost.run/v1/graphql",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "x-hasura-admin-secret": "yS*&j$C)!AzCLQK%_HiIC2fcI5K0kjvB",
    //       // "x-hasura-admin-secret":process.env.HASURA_ADMIN_SECRET ,
    //     },
    //     body: JSON.stringify({
    //       query: mutation,
    //       variables: {
    //         email: email,
    //         url: url,
    //         title: title,
    //         response: response,
    //       },
    //     }),
    //   }
    // );

    const result = await fetch(`${process.env.HASURA_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET || "",
      },
      body: JSON.stringify({
        query: mutation,
        variables: { email, url, title, response },
      }),
    });

    // const result = await fetch('https://lesfhoucwjhkulqdwned.hasura.ap-south-1.nhost.run/api/rest/yt_video_data', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET ||''
    //   },
    //   body: JSON.stringify({
    //     query: mutation,
    //     variables: { email,url, title, response,  }
    //   })
    // })

    const data = await result.json();
    // res.status(200).json(data)
    console.log(
      "data from fetch of hasura rest api:",
      data,
      process.env.HASURA_ADMIN_SECRET
    );

    // if (data.errors || !data.ok) {
    //   return NextResponse.json({ error: data.errors, status: 500 });
    // }

    return NextResponse.json({ data: data, status: 200 });

  } catch (error) {
    console.error("Error:", error);
    // res.status(500).json({ error: 'Failed to save data' })

    return NextResponse.json({ error: "failed to save data", status: 500 });
  }
}

//   return NextResponse.json({ message: "request is coming inside save-user" });
// }



