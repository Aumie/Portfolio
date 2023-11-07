FROM node:18-alpine3.15

WORKDIR /app

COPY ./scripts /scripts
RUN chmod +x /scripts
EXPOSE 4173

COPY . /app
RUN npm install
ENV PATH="/scripts:$PATH"
ENV NODE_OPTIONS=--max_old_space_size=1024


CMD ["run.sh"]
