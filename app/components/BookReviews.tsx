"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../../lib/supabase";

type Review = {
  id: string;
  user_id: string;
  rating: number;
  review: string | null;
  created_at: string;
};

type BookReviewsProps = {
  bookId: string;
  onReviewChange?: () => void;
};

export default function BookReviews({
  bookId,
  onReviewChange,
}: BookReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadReviews();
    loadUser();
  }, [bookId]);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUserId(user?.id ?? null);
  }

  async function loadReviews() {
    setLoading(true);

    const { data, error } = await supabase
      .from("book_reviews")
      .select("id,user_id,rating,review,created_at")
      .eq("open_library_id", bookId)
      .order("created_at", { ascending: false });

    if (!error) {
      setReviews(data ?? []);
    }

    setLoading(false);
  }

  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (sum, item) => sum + item.rating,
          0
        ) / reviews.length
      : 0;

  async function submitReview() {
    setMessage("");

    if (!userId) {
      setMessage("Please sign in to write a review.");
      return;
    }

    if (rating === 0) {
      setMessage("Please select a rating.");
      return;
    }

    if (!reviewText.trim()) {
      setMessage("Please write a short review.");
      return;
    }

    setSubmitting(true);

    const existingReview = reviews.find(
      (item) => item.user_id === userId
    );

    let error;

    if (existingReview) {
      const result = await supabase
        .from("book_reviews")
        .update({
          rating,
          review: reviewText.trim(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingReview.id)
        .eq("user_id", userId);

      error = result.error;
    } else {
      const result = await supabase
        .from("book_reviews")
        .insert({
          user_id: userId,
          open_library_id: bookId,
          rating,
          review: reviewText.trim(),
        });

      error = result.error;
    }

    if (error) {
      console.error(error);
      setMessage("Unable to save your review.");
    } else {
      setReviewText("");
setRating(0);
setMessage("Your review was saved.");

await loadReviews();

onReviewChange?.();
    }

    setSubmitting(false);
  }

  async function deleteReview(id: string) {
    if (!userId) return;

    const { error } = await supabase
      .from("book_reviews")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (!error) {
      setReviews((items) =>
        items.filter((item) => item.id !== id)
      );
      setRating(0);
      setReviewText("");
    }
  }

  const myReview = reviews.find(
    (item) => item.user_id === userId
  );

  return (
    <section className="book-reviews">
      <div className="book-reviews-heading">
        <div>
          <span className="eyebrow">
            READER REVIEWS
          </span>

          <h3>What readers think</h3>
        </div>

        <div className="book-rating-summary">
          <strong>
            {averageRating
              ? averageRating.toFixed(1)
              : "—"}
          </strong>

          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>
                {star <= Math.round(averageRating)
                  ? "★"
                  : "☆"}
              </span>
            ))}
          </div>

          <small>
            {reviews.length}{" "}
            {reviews.length === 1
              ? "review"
              : "reviews"}
          </small>
        </div>
      </div>

      <motion.div
        className="review-form"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h4>
          {myReview
            ? "Update your review"
            : "Share your thoughts"}
        </h4>

        <div className="rating-selector">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() =>
                setHoverRating(star)
              }
              onMouseLeave={() =>
                setHoverRating(0)
              }
              aria-label={`Rate ${star} out of 5`}
            >
              {star <=
              (hoverRating || rating)
                ? "★"
                : "☆"}
            </button>
          ))}
        </div>

        <textarea
          value={reviewText}
          onChange={(event) =>
            setReviewText(event.target.value)
          }
          placeholder="What did you think about this book?"
          maxLength={1000}
        />

        <div className="review-form-footer">
          <small>
            {reviewText.length}/1000
          </small>

          <button
            type="button"
            onClick={submitReview}
            disabled={submitting}
          >
            {submitting
              ? "Saving..."
              : myReview
              ? "Update review"
              : "Post review"}
          </button>
        </div>

        {message && (
          <p className="review-message">
            {message}
          </p>
        )}
      </motion.div>

      <div className="reviews-list">
        <AnimatePresence>
          {loading ? (
            <p>Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <div className="no-reviews">
              <span>✦</span>
              <h4>Be the first reader to review this book.</h4>
              <p>
                Your thoughts could help another reader
                discover their next favorite story.
              </p>
            </div>
          ) : (
            reviews.map((item) => (
              <motion.article
                key={item.id}
                className="review-card"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}
              >
                <div className="review-card-top">
                  <div>
                    <div className="review-stars">
                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <span key={star}>
                            {star <= item.rating
                              ? "★"
                              : "☆"}
                          </span>
                        )
                      )}
                    </div>

                    <small>
                      {new Date(
                        item.created_at
                      ).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </small>
                  </div>

                  {item.user_id === userId && (
                    <button
                      type="button"
                      onClick={() =>
                        deleteReview(item.id)
                      }
                    >
                      Delete
                    </button>
                  )}
                </div>

                {item.review && (
                  <p>
                    “{item.review}”
                  </p>
                )}

                <span className="review-reader">
                  Reader
                </span>
              </motion.article>
            ))
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}