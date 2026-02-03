import enum
from datetime import datetime

from fastapi.encoders import jsonable_encoder


class JsonEnconder:
    __custom_encoder_to_json = {
        datetime: lambda date_obj: date_obj,
        enum.Enum: lambda enum_obj: enum_obj
    }

    __custom_encoder_to_json_basic = {
        enum.Enum: lambda enum_obj: enum_obj.name
    }

    @staticmethod
    def to_json(objeto):
        return jsonable_encoder(objeto, custom_encoder=JsonEnconder.__custom_encoder_to_json)

    @staticmethod
    def to_json_basic(objeto):
        return jsonable_encoder(objeto, custom_encoder=JsonEnconder.__custom_encoder_to_json_basic)
