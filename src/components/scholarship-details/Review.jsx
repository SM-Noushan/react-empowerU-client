import { Avatar, Blockquote, Rating } from "flowbite-react";
import PropTypes from "prop-types";

const Review = ({ data }) => {
  const { userName, userImage, reviewDate, rating, reviewMessage } = data;
  return (
    <figure className="mx-auto max-w-screen-md text-center">
      <svg
        className="mx-auto mb-3 h-10 w-10 text-gray-400 dark:text-gray-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 14"
      >
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
      </svg>
      <Blockquote>
        <p className="text-2xl font-medium italic text-gray-900 dark:text-white">
          &#34;{reviewMessage}&#34;
        </p>
      </Blockquote>
      <figcaption className="mt-6 flex items-center justify-center space-x-3">
        <Avatar rounded size="xs" img={userImage} alt="reviewer-image" />
        <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
          <cite className="pr-3 flex items-center gap-x-2 font-medium text-gray-900 dark:text-white">
            {userName}
            <Rating>
              ({rating}
              <Rating.Star className="size-3.5 text-gray-900 dark:text-white" />
              )
            </Rating>
          </cite>
          <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
            On: {reviewDate}
          </cite>
        </div>
      </figcaption>
    </figure>
  );
};

Review.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Review;
