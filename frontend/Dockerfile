FROM node:18-alpine3.15

WORKDIR /app

COPY ./scripts /scripts
RUN chmod +x /scripts
EXPOSE 5173

COPY . /app
RUN npm install
ENV PATH="/scripts:$PATH"


CMD ["run.sh"]
