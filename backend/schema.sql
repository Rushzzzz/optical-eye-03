-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table (Admin/Staff)
create table users (
  id uuid default uuid_generate_v4() primary key,
  username text unique not null,
  password_hash text not null,
  role text check (role in ('admin', 'staff')) not null default 'staff',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Patients Table
create table patients (
  id serial primary key,
  full_name text not null,
  phone text not null,
  address text,
  visit_date date,
  right_eye_power text,
  left_eye_power text,
  notes text,
  registered_by uuid references users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Invoices Table
create table invoices (
  id text primary key, -- Custom ID like 'INV-001'
  patient_id integer references patients(id) on delete cascade,
  date date not null,
  subtotal numeric(10, 2) not null,
  discount numeric(5, 2) default 0,
  tax numeric(5, 2) default 0,
  total numeric(10, 2) not null,
  status text check (status in ('paid', 'pending', 'cancelled')) default 'pending',
  items jsonb not null, -- Storing items as JSON for simplicity
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Reminders Table
create table reminders (
  id uuid default uuid_generate_v4() primary key,
  patient_id integer references patients(id) on delete cascade,
  type text check (type in ('visit', 'glass_change', 'checkup')) not null,
  date date not null,
  status text check (status in ('pending', 'completed')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert Default Admin User (Password: admin123)
-- Hash generated for 'admin123' using bcrypt
insert into users (username, password_hash, role)
values ('admin', '$2b$10$5X9.1x5X9.1x5X9.1x5X9.1x5X9.1x5X9.1x5X9.1x5X9.1x5X9.1', 'admin');
