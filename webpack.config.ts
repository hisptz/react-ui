export default {
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: [/node_modules/],
        use: "ts-loader",
      },
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: "ts-loader",
      },
      {
        test: /\.feature$/,
        use: [
          {
            loader: "@badeball/cypress-cucumber-preprocessor/webpack",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: "file-loader",
      },
    ],
  },
};
