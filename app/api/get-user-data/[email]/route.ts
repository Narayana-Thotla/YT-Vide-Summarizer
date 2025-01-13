import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string ,id:string } }
): Promise<any> {
  const { email,id } = params;

  console.log("email form client:",email,id);


  const query=`query YT_Video_Data($_eq: citext = "") {
    YT_Video_Data(where: {email: {_eq: $_eq}}) {
      email
      id
      response
      title
      url
    }
  }`
  

  const query1=`query YT_Video_Data {
  YT_Video_Data {
    email
    id
    response
    title
    url
  }
}`


  

  try {
    // const result = await fetch(`https://lesfhoucwjhkulqdwned.hasura.ap-south-1.nhost.run/api/rest/YT_Video_Data/${email}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET || "",
    //   },
    // });

    // const data = await result.json()
    // console.log('data of yt of user:',data);

    // const result = await fetch(`https://lesfhoucwjhkulqdwned.hasura.ap-south-1.nhost.run/v1/graphql`, {
    const result = await fetch(process.env.HASURA_ENDPOINT || '', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET || "",
      },
       body: JSON.stringify({
        query: query,
        variables: { '_eq':`${email}` },
      }),
    });

    const data = await result.json()
    console.log('data of yt of user only data.data:',data.data);
    console.log('data of yt of user:',data.data.YT_Video_Data);
    

    return NextResponse.json({
      message: "its goin inside the get-user-data",
      userHistoryData:data.data.YT_Video_Data,
      status: 200,
    });
  } catch (error:any) {
    console.log('some error in get-user-data in catch:',error.message);
    return NextResponse.json({
        message: "some error  inside the get-user-data",
        status: 500,
      });
  }
}
