CREATE SCHEMA IF NOT EXISTS whensat;

CREATE TABLE whensat.satellites (
    norad_cat_id INTEGER NOT NULL,
    object_name VARCHAR(255) NOT NULL,
    epoch TIMESTAMP WITH TIME ZONE NOT NULL,
    tle_line1 CHAR(69) NOT NULL,
    tle_line2 CHAR(69) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_satellites_history PRIMARY KEY (norad_cat_id, epoch)
);

CREATE INDEX idx_sat_epoch ON whensat.satellites (norad_cat_id, epoch DESC);

COMMENT ON TABLE whensat.satellites IS 'Armazena histórico de TLEs (Two-Line Elements) para propagação orbital';