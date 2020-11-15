import numpy as np
import warnings
try:
    import matplotlib.pyplot as plt
    from matplotlib import lines
    from matplotlib.font_manager import FontProperties
    from matplotlib.path import Path
    from matplotlib.patches import PathPatch
    import matplotlib
except ImportError:
    warnings.warn("matplotlib could not be loaded!")
    pass

import shap.plots._force_matplotlib


def draw_labels(fig, ax, out_value, features, feature_type, offset_text, total_effect=0, min_perc=0.05,
                text_rotation=0):
    start_text = out_value
    pre_val = out_value

    # Define variables specific to positive and negative effect features
    if feature_type == 'positive':
        colors = ['#FF0D57', '#FFC3D5']
        alignement = 'right'
        sign = 1
    else:
        colors = ['#1E88E5', '#D1E6FA']
        alignement = 'left'
        sign = -1

    # Draw initial line
    if feature_type == 'positive':
        x, y = np.array([[pre_val, pre_val], [0, -0.18]])
        line = lines.Line2D(x, y, lw=1., alpha=0.5, color=colors[0])
        line.set_clip_on(False)
        ax.add_line(line)
        start_text = pre_val

    box_end = out_value
    val = out_value
    for feature in features:
        # Exclude all labels that do not contribute at least 10% to the total
        feature_contribution = np.abs(float(feature[0]) - pre_val) / np.abs(total_effect)
        if feature_contribution < min_perc:
            break

        # Compute value for current feature
        val = float(feature[0])

        # Draw labels.
        feature_val = feature[1]
        feature_name = feature[2]
        if feature_val == "" or feature_val is None:
            text = str(feature_name)
        elif isinstance(feature_val, bool) or isinstance(feature_val, str):
            text = "{} = {}".format(feature_name, feature_val)
        else:
            val_str = "{0:,.3f}".format(feature_val).rstrip("0").rstrip(".")
            text = "{} = {}".format(feature_name, val_str)

        if text_rotation is not 0:
            va_alignment = 'top'
        else:
            va_alignment = 'baseline'

        text_out_val = plt.text(start_text - sign * offset_text,
                                -0.15, text,
                                fontsize=12, color=colors[0],
                                horizontalalignment=alignement,
                                va=va_alignment,
                                rotation=text_rotation)
        text_out_val.set_bbox(dict(facecolor='none', edgecolor='none'))

        # We need to draw the plot to be able to get the size of the
        # text box
        fig.canvas.draw()
        box_size = text_out_val.get_bbox_patch().get_extents() \
            .transformed(ax.transData.inverted())
        if feature_type == 'positive':
            box_end_ = box_size.get_points()[0][0]
        else:
            box_end_ = box_size.get_points()[1][0]

        # If the feature goes over the side of the plot, we remove that label
        # and stop drawing labels
        if box_end_ > ax.get_xlim()[1]:
            text_out_val.remove()
            break

        # Create end line
        if (sign * box_end_) > (sign * val):
            x, y = np.array([[val, val], [0, -0.18]])
            line = lines.Line2D(x, y, lw=1., alpha=0.5, color=colors[0])
            line.set_clip_on(False)
            ax.add_line(line)
            start_text = val
            box_end = val

        else:
            box_end = box_end_ - sign * offset_text
            x, y = np.array([[val, box_end, box_end],
                             [0, -0.08, -0.18]])
            line = lines.Line2D(x, y, lw=1., alpha=0.5, color=colors[0])
            line.set_clip_on(False)
            ax.add_line(line)
            start_text = box_end

        # Update previous value
        pre_val = float(feature[0])

    # Create line for labels
    extent_shading = [out_value, box_end, 0, -0.31]
    path = [[out_value, 0], [pre_val, 0], [box_end, -0.08],
            [box_end, -0.2], [out_value, -0.2],
            [out_value, 0]]

    path = Path(path)
    patch = PathPatch(path, facecolor='none', edgecolor='none')
    ax.add_patch(patch)

    # Extend axis if needed
    lower_lim, upper_lim = ax.get_xlim()
    if (box_end < lower_lim):
        ax.set_xlim(box_end, upper_lim)

    if (box_end > upper_lim):
        ax.set_xlim(lower_lim, box_end)

    # Create shading
    if feature_type == 'positive':
        colors = np.array([(255, 13, 87), (255, 255, 255)]) / 255.
    else:
        colors = np.array([(30, 136, 229), (255, 255, 255)]) / 255.

    cm = matplotlib.colors.LinearSegmentedColormap.from_list('cm', colors)

    _, Z2 = np.meshgrid(np.linspace(0, 10), np.linspace(-10, 10))
    im = plt.imshow(Z2, interpolation='quadric', cmap=cm,
                    vmax=0.01, alpha=0.3,
                    origin='lower', extent=extent_shading,
                    clip_path=patch, clip_on=True, aspect='auto')
    im.set_clip_path(patch)

    return fig, ax


shap.plots._force_matplotlib.draw_labels = draw_labels