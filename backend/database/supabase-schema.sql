-- Supabase Database Schema for Genomic Platform
-- Run this in Supabase SQL Editor

-- Enable UUID extension (may already be enabled in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stacks_address VARCHAR(255) UNIQUE,
    email VARCHAR(255),
    username VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Files table for uploaded genomic files
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    original_name VARCHAR(500) NOT NULL,
    stored_filename VARCHAR(500) NOT NULL,
    file_path VARCHAR(1000) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    file_extension VARCHAR(20),
    file_hash VARCHAR(128), -- SHA-256 hash for integrity
    upload_status VARCHAR(50) DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analysis results table
CREATE TABLE analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    file_id UUID REFERENCES files(id),
    user_id UUID REFERENCES users(id),
    analysis_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    results JSONB,
    blockchain_proof_hash VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Blockchain transactions table
CREATE TABLE blockchain_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    file_id UUID REFERENCES files(id),
    analysis_id UUID REFERENCES analyses(id),
    transaction_type VARCHAR(100) NOT NULL,
    stacks_tx_id VARCHAR(128),
    contract_call_data JSONB,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    confirmed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX idx_files_user_id ON files(user_id);
CREATE INDEX idx_files_created_at ON files(created_at);
CREATE INDEX idx_analyses_file_id ON analyses(file_id);
CREATE INDEX idx_analyses_user_id ON analyses(user_id);
CREATE INDEX idx_blockchain_transactions_user_id ON blockchain_transactions(user_id);
CREATE INDEX idx_blockchain_transactions_stacks_tx_id ON blockchain_transactions(stacks_tx_id);

-- Enable Row Level Security (RLS) for Supabase
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE blockchain_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (users can only access their own data)
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Users can view own files" ON files FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own files" ON files FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own files" ON files FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can view own analyses" ON analyses FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own analyses" ON analyses FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own transactions" ON blockchain_transactions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own transactions" ON blockchain_transactions FOR INSERT WITH CHECK (user_id = auth.uid());