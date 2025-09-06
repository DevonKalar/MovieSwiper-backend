import { Router } from 'express';
import { openaiService } from '../../services/openaiService';

const router = Router();

// Post endpoint to handle OpenAI requests
router.post('/response', async (req, res) => {
    try {
        const { input, previous_response_id } = req.body;
        if (!input) {
            return res.status(400).json({ error: 'Input is required' });
        }
        const response = await openaiService.createResponse(input, previous_response_id);

        res.json({
            id: response.id,
            output_text: response.output_text,
            status: response.status,
            created_at: response.created_at,
        });
    } catch (error) {
        console.error('OpenAi Responses API error:', error);
        res.status(500).json({ error: 'Failed to create response'});
    }
    })

router.get('/response/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const response = await openaiService.retrieveResponse(id);

        res.json({
            id: response.id,
            output_text: response.output_text,
            status: response.status,
            created_at: response.created_at,
        });
    } catch (error) {
        console.error('OpenAi Retrieve Response API error:', error);
        res.status(500).json({ error: 'Failed to retrieve response' });
    }
})

export default router;