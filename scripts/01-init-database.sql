-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(255) NOT NULL,
  fileName VARCHAR(255) NOT NULL,
  filePath TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actionType VARCHAR(50) NOT NULL CHECK (actionType IN ('typing', 'paste')),
  typedLines INT NOT NULL DEFAULT 0,
  pastedLines INT NOT NULL DEFAULT 0,
  totalLines INT NOT NULL DEFAULT 0,
  contentSnippet TEXT,
  editorVersion VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_activity_logs_username ON activity_logs(username);
CREATE INDEX IF NOT EXISTS idx_activity_logs_date ON activity_logs(date);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON activity_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_activity_logs_filename ON activity_logs(fileName);
