-- ============================================================
--  ATOLLOM AI — Supabase Row Level Security (Zero Trust)
--  Ejecutar en: Supabase Dashboard > SQL Editor
--  Tabla: public.lead (singular, ya existente)
-- ============================================================

-- ---- 1. Activar RLS en la tabla existente ----
ALTER TABLE public.lead ENABLE ROW LEVEL SECURITY;

-- ---- 2. INSERT permitido para anon (el servidor inserta con anon key) ----
CREATE POLICY "lead_insert_anon"
  ON public.lead
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ---- 3. SELECT solo para admins autenticados ----
CREATE POLICY "lead_select_authenticated"
  ON public.lead
  FOR SELECT
  TO authenticated
  USING (true);

-- ---- 4. UPDATE solo para admins autenticados ----
CREATE POLICY "lead_update_authenticated"
  ON public.lead
  FOR UPDATE
  TO authenticated
  USING (true);

-- ---- 5. DELETE solo para admins autenticados ----
CREATE POLICY "lead_delete_authenticated"
  ON public.lead
  FOR DELETE
  TO authenticated
  USING (true);

-- ---- 6. Permisos de rol ----
GRANT INSERT ON public.lead TO anon;
GRANT ALL ON public.lead TO authenticated;

-- ---- 7. Índices (si no existen) ----
CREATE INDEX IF NOT EXISTS idx_lead_email ON public.lead (email);
CREATE INDEX IF NOT EXISTS idx_lead_created_at ON public.lead (created_at DESC);

-- ============================================================
--  VERIFICACIÓN
-- ============================================================
-- SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'lead';
-- SELECT policyname, cmd, roles FROM pg_policies WHERE tablename = 'lead';
-- ============================================================
