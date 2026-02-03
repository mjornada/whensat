CREATE SCHEMA IF NOT EXISTS whensat;

CREATE TABLE whensat.tb_satellites
(
    sat_norad_cat_id serial not null,
    sat_object_name  character varying(255),
    sat_epoch        timestamp(6),
    sat_tle_line_one character varying(69),
    sat_tle_line_two character varying(69),
    sat_created_at   timestamp(6),
    CONSTRAINT pk_satellites_history PRIMARY KEY (sat_norad_cat_id, sat_epoch)
);

CREATE INDEX idx_sat_epoch ON whensat.tb_satellites (sat_norad_cat_id, sat_epoch DESC);

COMMENT ON TABLE whensat.tb_satellites IS 'Armazena histórico de TLEs (Two-Line Elements) para propagação orbital';