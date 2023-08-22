import { ActionFunction, LoaderArgs, LoaderFunction, json, redirect } from '@remix-run/node'
import { createServerClient } from '@supabase/auth-helpers-remix'
import { useActionData, useLoaderData } from 'react-router'

import OrcatsLogo from '~/assets/OrcatsLogo.png'

export const action: ActionFunction = async ({ request }) => {
  const response = new Response()

  const supabase = createServerClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || '',
    { request, response }
  )

  const { data: { session }} = await supabase.auth.getSession()

  // ...perform action

  return redirect('/')
}

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const response = new Response()
  // an empty response is required for the auth helpers
  // to set cookies to manage auth

  const supabase = createServerClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_KEY || '',
    { request, response }
  )
  const { data: { session }} = await supabase.auth.getSession()

  /// ...resolve loader

  return json({ session })
}

export default function Index() {
  const { session } = useLoaderData()
  const actionData = useActionData()

  return (
    <div className="mx-auto w-1/2 max-w-[600px] max-lg:w-5/6 font-['owners-xwide']">
      <img src={OrcatsLogo} alt="A logo depicting a cat and orca hybrid" />
      <h1 className="font-bold text-center text-6xl">orcats</h1>
      <ul className="text-center my-4">
        <li>USAU Washington Sectionals - September 9-10, 2023</li>
      </ul>
    </div>
  );
}
