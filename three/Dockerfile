FROM node:18-alpine3.15

WORKDIR /app

COPY ./scripts /scripts
RUN chmod +x /scripts
RUN chmod +x /scripts/run.sh
EXPOSE 5173

COPY . /app
RUN npm install
ENV PATH="/scripts:$PATH"
#https://stackoverflow.com/questions/67903114/javascript-heap-out-of-memory-in-docker-image-run
ENV NODE_OPTIONS=--max_old_space_size=2048

#https://stackoverflow.com/questions/62663167/dockerizing-react-in-production-mode-fatal-error-ineffective-mark-compacts-nea
ENV GENERATE_SOURCEMAP=false

CMD ["run.sh"]
