# Readable Project

Readable Project is the second challenge project of Udacity Nanodegree React Program.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent guide version of creating projects with `create-react-app` [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Test yourself

Follow these steps

* `git clone https://github.com/marquesm91/react-readable`
* `npm install` or `yarn`
* `npm run start` or `yarn start`

The application will open your default browser on https://localhost:3002/

## About the application

After the default installation with `create-react-app`, three 3rd party library was added:

* `react-router-dom` found [here](https://github.com/ReactTraining/react-router) and used to better experience with browser url navigation and keep react application sync'd.
* `escape-string-regexp` found [here](https://github.com/sindresorhus/escape-string-regexp) and used to format RegExp.
* `sort-by` found [here](https://github.com/kvnneff/sort-by) and used to sort array based on an key object.
* `uuid` found [here](https://github.com/kelektiv/node-uuid) and used to set Unique IDs.
* `antd` found [here](https://github.com/ant-design/ant-design) and used to ease and create the best UX/UI possible.

The application consumes **ReadableAPI** provided earlier from the starter kit Github [repo](https://github.com/udacity/reactnd-project-readable-starter).

## What you can do

* You can add/remove/edit/vote Post and Comment as long as they exists.
* You can filter a Post list by categories pre defined.
* You can sort a Post list or Comment list by vote score or date and order from the most older or newer.
* You can search for a specific title Post, Author or Body content comment.

## Features

All features listed are a plus and not mentioned in challenge's specification.

* As said before, you can search for a specific title Post, Author or Body content comment.
* The sort feature is smart enough to pick a Post sort or Comment sort when necessary.
* The Add button have the best UX possible to add a Comment or Post when necessary acting like a joker.
* The Add Post button will come with a label next to it if the selected category has zero posts.
* The Add Post button will come with a label next to it if the application has zero posts.
* The Add Comment button will come with a label next to it if the selected Post has zero comments.
* The form will pre fill the category for you if you choose to add a Post when any category was selected.
