import json

from rest_framework.renderers import JSONRenderer


class TodoJSONRenderer(JSONRenderer):
    charset = 'utf-8'

    def render(self, data, media_type=None, renderer_context=None):

        errors = data.get('errors', None)

        token = data.get('token', None)

        # print(token)

        if errors is not None:
            return super(TodoJSONRenderer, self).render(data)

        if token is not None and isinstance(token, bytes):
            data['token'] = token.decode('utf-8')

        return json.dumps({
            'todo': data
        })