from django.utils import timezone




def calculate_hotness(post):
    # Calculate the age of the post in hours
    age_in_hours = (timezone.now() - post.created_at).total_seconds() / 3600
    
    # Define weights for different parameters
    likes_weight = 0.7
    views_weight = 0.2
    recent_activity_weight = 0.1
    
    # Calculate the hotness score
    hotness_score = (
        (post.like.count() * likes_weight) + 
        (post.watched.count() * views_weight) + 
        (recent_activity_weight / age_in_hours)
    )
    
    return hotness_score
