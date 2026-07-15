import { createClient } from '@supabase/supabase-js'


const supabaseUrl = "https://lzxotetcrovcpkgflbhx.supabase.co"
const supabaseKey = "sb_publishable_NBg43kNZQY1xq-wSu7Z1_Q_HqARr4-L"


export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)