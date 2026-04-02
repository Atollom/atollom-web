-- ============================================================
--  ATOLLOM AI — Supabase Row Level Security (Zero Trust)
--  Ejecutar en: Supabase Dashboard > SQL Editor
--  Principio: nadie lee los leads excepto admins autenticados.
--              solo el servidor puede insertar (via anon key).
-- ============================================================

-- ---- 1. Crear tabla leads (si no existe) ----
CREATE TABLE IF NOT EXISTS public.leads (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email       TEXT NOT NULL,
  history     JSONB,
  source      TEXT DEFAULT 'Atollom Web',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ---- 2. Activar RLS en la tabla ----
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- ---- 3. Política: INSERT permitido para anon (tu servidor usa anon key) ----
--  Solo se puede insertar. No se puede leer, actualizar ni borrar.
CREATE POLICY "leads_insert_anon"
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (
    email IS NOT NULL
    AND email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'
  );

-- ---- 4. Política: SELECT solo para usuarios autenticados (admins) ----
CREATE POLICY "leads_select_authenticated"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);

-- ---- 5. Política: UPDATE solo para admins autenticados ----
CREATE POLICY "leads_update_authenticated"
  ON public.leads
  FOR UPDATE
  TO authenticated
  USING (true);

-- ---- 6. Política: DELETE solo para admins autenticados ----
CREATE POLICY "leads_delete_authenticated"
  ON public.leads
  FOR DELETE
  TO authenticated
  USING (true);

-- ---- 7. Revocar acceso público directo ----
--  Esto asegura que nadie pueda acceder a la tabla sin pasar por RLS.
REVOKE ALL ON public.leads FROM PUBLIC;
GRANT INSERT ON public.leads TO anon;
GRANT ALL ON public.leads TO authenticated;

-- ---- 8. Índice para búsquedas por email ----
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);

-- ============================================================
--  VERIFICACIÓN — Ejecuta esto después para confirmar que RLS
--  está activo y las políticas existen:
-- ============================================================
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'leads';
-- SELECT policyname, cmd, roles FROM pg_policies WHERE tablename = 'leads';
-- ============================================================
